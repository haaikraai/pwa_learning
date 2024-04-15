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


## OFFLINE DEPLOYMENT:
1. Github Pages:
Create 404.html. All deployment angular should rewrite server to fallback on index.html.

2. Use cordova. Just create new app and copy files

3. Try "save as single html" (no service worker)

4. Try firebase perhaps

5. Content-security-policy:
`<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *">`
This CSP declaration includes:

default-src 'self': Allows loading resources from the same origin as the app.
data:: Allows loading data URLs.
gap:: Required for iOS when using UIWebView for JS-to-native communication.
https://ssl.gstatic.com: Required for Android for TalkBack to function properly.
style-src 'self' 'unsafe-inline': Allows loading styles from the same origin and inline styles.
media-src *: Allows loading media from any source.

Whole list:

default-src: Specifies the default policy for fetching resources such as JavaScript, CSS, and images. For example, default-src 'self' cdn.example.com; allows resources to be loaded from the same origin and cdn.example.com 2.

script-src: Defines authorized sources for JavaScript. For instance, script-src 'self' js.example.com; allows scripts to be loaded from the same origin and js.example.com 2.

style-src: Specifies authorized sources for stylesheets. An example is style-src 'self' css.example.com; which permits stylesheets to be loaded from the same origin and css.example.com 2.

object-src: Controls the sources for plugins like <object> or <embed>. For example, object-src 'self'; allows plugins to be loaded from the same origin 2.

img-src: Defines authorized sources for images. An example is img-src 'self' img.example.com; which allows images to be loaded from the same origin and img.example.com 2.

media-src: Specifies authorized sources for media elements like <video> and <audio>. For instance, media-src media.example.com; allows media to be loaded from media.example.com 2.

frame-src: Deprecated in CSP Level 2 in favor of child-src, but still valid in CSP Level 3. It defines valid sources for loading frames. An example is frame-src 'self'; which allows frames to be loaded from the same origin 4.

font-src: Specifies where font files can be loaded from. For example, font-src font.example.com; allows fonts to be loaded from font.example.com 2.

connect-src: Applies to connections from XMLHttpRequest (AJAX) or WebSocket. An example is connect-src 'self'; which allows connections to be made from the same origin 2.

report-uri: Instructs the browser to send a report of policy failures to a specified URI. For instance, report-uri /some-report-uri; specifies the URI for reporting 2.
