require('url-search-params-polyfill');

const fs = require('fs');
const path = require('path');

const express = require('express');

const { WorkOS } = require('@workos-inc/node');

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

const app = express();

app.get('/', (_req, res) => {
    const provider =  'GoogleOAuth';
    const redirectURI = 'http://localhost:3000/callback'

    const authorizationURL = workos.sso.getAuthorizationURL({
        clientID: clientID,
        redirectURI: redirectURI,
        provider: provider,
    });

    res.redirect(authorizationURL);
});


app.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;
      
        const { profile } = await workos.sso.getProfileAndToken({
          code,
          clientID,
        });
            
        res.json({
            status: 'success',
            profile
        });
    } catch (e) {
        res.json({ error: e.message })
    }
});

app.get('/envvars', async (req, res) => {
    res.send('<pre>' + JSON.stringify(process.env, null, 2) + '</pre>');
});

app.get('/cert', async (req, res) => {
    const certPath = path.resolve(process.env.NODE_EXTRA_CA_CERTS + '.pem');
    res.send(fs.readFileSync(certPath));
});



app.listen(3000, () => console.log('it is running...'));
