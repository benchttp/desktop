package httpclient

import (
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/benchttp/sdk/benchttp"
	"github.com/benchttp/sdk/configio"

	"github.com/benchttp/desktop/runner/httpclient/response"
)

func handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	runner := benchttp.DefaultRunner()
	runner.OnProgress = streamProgress(w)

	if err := configio.NewJSONDecoder(r.Body).DecodeRunner(&runner); err != nil {
		clientError(w, err)
		return
	}

	report, err := runner.Run(r.Context())
	var errInvalidRunner *benchttp.InvalidRunnerError
	switch {
	case err == nil:
		// Pass through.
	case err == benchttp.ErrCanceled:
		clientError(w, err)
		return
	case errors.As(err, &errInvalidRunner):
		clientError(w, errInvalidRunner.Errors...)
		return
	default:
		internalError(w, err)
		return
	}

	// hack: the write for the Report sometimes appears to be merged
	// with the last write for the Progress, leading to invalid JSON.
	// The issue is likely on the read side (front-end), but this is
	// the easiest fix for now.
	time.Sleep(10 * time.Millisecond)
	if err := response.Report(report).EncodeJSON(w); err != nil {
		internalError(w, err)
		return
	}
}

func streamProgress(w http.ResponseWriter) func(benchttp.RecordingProgress) {
	return func(progress benchttp.RecordingProgress) {
		if err := response.Progress(progress).EncodeJSON(w); err != nil {
			internalError(w, err)
		}
		w.(http.Flusher).Flush()
	}
}

func clientError(w http.ResponseWriter, e ...error) {
	log.Printf("client error: %v\n", e)
	w.WriteHeader(http.StatusBadRequest)

	if err := response.ErrorClient(e).EncodeJSON(w); err != nil {
		// Fallback to plain text encoding.
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func internalError(w http.ResponseWriter, e ...error) {
	log.Printf("server error: %v\n", e)
	w.WriteHeader(http.StatusInternalServerError)

	if err := response.ErrorServer(e).EncodeJSON(w); err != nil {
		// Fallback to plain text encoding.
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
