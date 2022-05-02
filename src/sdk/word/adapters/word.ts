export const wordAdapter = `{
    "status": { /* Captures state of the Response */
        "code": 200,
        "message": "OK"
    },
    "data": $not($exists(results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]))
        ? null /* For errors data will be null */
        : {
            "word":results[0].id,
            "meaning":results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
            /* Fields: oauth are being omitted */
        }
}`;



// {
//     "error": "No entry found matching supplied source_lang, word and provided filters"
//   }