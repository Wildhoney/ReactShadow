import React from 'react';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { Response } from '@remix-run/node';
import type { EntryContext, Headers } from '@remix-run/node';

const ABORT_DELAY = 5000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    return new Promise((resolve, reject) => {
        let didError = false;

        const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} />, {
            onShellReady() {
                let body = new PassThrough();

                responseHeaders.set('Content-Type', 'text/html');

                resolve(
                    new Response(body, {
                        status: didError ? 500 : responseStatusCode,
                        headers: responseHeaders,
                    })
                );
                pipe(body);
            },
            onShellError(err: unknown) {
                reject(err);
            },
            onError(error: unknown) {
                didError = true;
                console.error(error);
            },
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
