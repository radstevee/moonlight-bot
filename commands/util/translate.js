const langs = require('langs');
module.exports = {
    name: 'translate',
    description: 'Translates text from a detected language.',
    syntax: '<Text> --to <Language that the text should be translated in. Only codes like en, de.>',
    args: true,
    run:async(message) => {
        let translate = require('@iamtraction/google-translate')
        message.args = message.args.join(' ').split('--to')
        if(message.args[1].replace(/\s/g, '').length != 2) return message.channel.send('Invalid language code. Please use a valid one, like `en` oder `de`.')
        if(langs.has('1', message.args[1].replace(/\s/g, '')) == false) return message.channel.send('Invalid language code. Please use a valid one, like `en` oder `de`.')
        translate(message.args[0], { to: message.args[1].replace(/\s/g, '') }).then(res => {
            let langs = require('langs');
            fromLanguage = langs.where('1', res.from.language.iso).name
            toLanguage = langs.where('1', message.args[1].replace(/\s/g, '')).name
            message.channel.send(`Translation from ${fromLanguage} to ${toLanguage}: ${res.text}`)
        }).catch(err => {
            console.log(`[Error] Translate Command | ${err}`);
            message.channel.send('An error appeared.')
        });
    }
}