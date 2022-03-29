module.exports = {
    name: 'dictionary',
    description: 'Shows info from the dictionary',
    syntax: '<Word>',
    args: true,
    run:async(message, Discord, client, args) => {
        let fetch = require('node-fetch')
        let word = args.join(' ')
        let req = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}/`).catch(console.log);
        if(req.title) return await message.channel.send('Word couldn\'t be found.').catch(console.log);
        let res = await req.json().catch(console.log);
        if(!res) return await message.channel.send('Couldn\'t evaluate the word.').catch(console.log);
        let result = res[0];
        if(!result) return await message.channel.send('Couldn\'t find related words.').catch(console.log);
        let parse = {
            word: result.word,
            phonetic: result.phonetic || '-',
            origin: result.origin || '-',
            partOfSpeech: result.meanings[0]?.partOfSpeech || '-',
            example: result.meanings[0].definitions[0].example || '-', 
            synonyms: result.meanings[0].definitions[0].synonyms.join(', ') || '-',
            antonyms: result.meanings[0].definitions[0].antonyms.join(', ') || '-',
            definition: result.meanings[0].definitions[0].definition || '-'
        };
        parse.partOfSpeech = parse.partOfSpeech.replace(parse.partOfSpeech.charAt(0), parse.partOfSpeech.charAt(0).toUpperCase())
        parse.word = parse.word.replace(parse.word.charAt(0), parse.word.charAt(0).toUpperCase())
        return await message.channel.send({embeds: [{
            title: parse.word,
            description: `Phonetic: ${parse.phonetic}\nOrigin: ${parse.origin}\nPart of Speech: ${parse.partOfSpeech}\nExample: ${parse.example}\nSynonyms: ${parse.synonyms}\nAntonyms: ${parse.antonyms}\nDefinition: ${parse.definition}`,
            color: '#347ff7'
        }]}).catch(console.log);
    }
}
