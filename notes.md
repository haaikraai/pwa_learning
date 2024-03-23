## tgpt manifest.json basic boilerplate

```json
{
 "short_name": "MyApp",
 "name": "My Awesome App",
 "icons": [
    {
      "src": "icon/lowres.webp",
      "size": "48x48",
      "type": "image/webp"
    },
    {
      "src": "icon/hd_hi.ico",
      "size": "72x72 96x96 128x128 256x256",
      "type": "image/x-icon"
    },
    {
      "src": "icon/hd_hi.svg",
      "size": "72x72",
      "type": "image/svg+xml"
    }
 ],
 "start_url": "/",
 "display": "standalone",
 "background_color": "#ffffff",
 "theme_color": "#0"
}
```