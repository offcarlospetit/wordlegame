export const wordAdapter = `{
    "status": { /* Captures state of the Response */
        "code": 200,
        "message": "OK"
    },
    "data": $not($exists( $[0].word)) ? null 
        : {
            "word": $[0].word,
            "meaning":$[0].meanings[0].definitions[0].definition
            /* Fields: oauth are being omitted */
        } 
       
}`;



// {
//     "error": "No entry found matching supplied source_lang, word and provided filters"
//   }