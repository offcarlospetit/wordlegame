export const wordAdapter = `{
    "status": { /* Captures state of the Response */
        "code": 200,
        "message": "OK"
    },
    "data": $not($exists(data[0].word))
        ? null /* For errors data will be null */
        : {
            "word":data[0].word,
            "meanings":data[0].meanings[0].definitions[0].definition
            /* Fields: oauth are being omitted */
        }
}`;

