# Chromatica

A web app that connects with the Spotify API to generate unique color palettes based on your top tracks and artists. This site was designed to be clean, colorful, and fully responsive across all devices.

[**Website**](https://chromatica-music.vercel.app/)

## Features

- **Responsive Interface:** App sizes accordingly to your device viewport (size).

- **Dynamic Theming:** Users can toggle between light and dark modes.

- **Particles:** Animated translucent (bubble) like particles.

## Some Technologies Used

- **Google Fonts:** For custom typography, including the body font, Inter.

- **Spotify API:** Used to fetch data and establish a connection via OAuth.

## Running server

To run the development server:

```bash
ngrok http https://localhost:3000
```

Update .env "SPOTIFY_REDIRECT_URI" and Spotify Dashboard with new ngrok string redirect URL, then begin https on localhost:

```bash
npm run dev:https
```
