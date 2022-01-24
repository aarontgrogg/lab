<?php
    $projects = array(
        'es6',
        'express',
        'flexbox',
        'git',
        'grid',
        'grunt',
        'node',
        'promises',
        'react',
        'redux',
        'sass',
        'svelte',
        'udemy',
        'vs-code',
        'wpo'
    );
    $output = '<ul>';
    foreach ( $projects as $project ) {
        $output .= '<li><a href="'.$project['url'].'">'.$project['url'].'</a></li>';
    }
    $output .= '</ul>';
?><!doctype html>
<html dir="ltr" lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>Lab | Aaron T. Grogg, Web Developer</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="google-site-verification" content="lbVeIvYlafhq4llvj199Sh3gUfq55tMu065LnAgjliw">
        <meta name="color-scheme" content="light dark">
        <link rel="stylesheet" href="css/main.css">
        <meta author="Aaron T. Grogg, aarontgrogg.com, aarontgrogg@gmail.com">
        <meta name="keywords" content="Aaron T. Grogg,resume,curriculum vitae,cv">
        <meta name="description" content="Aaron T. Grogg's Online Lab">
        <meta name="googlebot" content="index,noarchive,follow,noodp">
        <meta name="robots" content="all,index,follow">
        <meta name="msnbot" content="all,index,follow">
        <meta name="referrer" content="always">
        <meta property="og:title" content="Aaron T. Grogg, Web Developer | Lab">
        <meta property="og:type" content="document">
        <meta property="og:url" content="https://aarontgrogg.com/">
        <meta property="og:image" content="https://aarontgrogg.com/resume/Atg-clean.png">
        <meta property="og:description" content="Aaron T. Grogg's Online Lab">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="https://aarontgrogg.com/">
        <meta name="twitter:title" content="Aaron T. Grogg, Web Developer | Lab">
        <meta name="twitter:description" content="Aaron T. Grogg's Online Lab">
        <meta name="twitter:image" content="https://aarontgrogg.com/resume/Atg-clean.png">
        <link rel="profile" href="https://gmpg.org/xfn/11">
        <link rel="canonical" href="https://aarontgrogg.com/lab/">
    </head>

    <body class="vcard" itemscope itemtype="http://schema.org/Person">
        <a class="skip-to-content" href="#main">Skip to main content</a>
        <header role="banner">
            <img src="/resume/Atg-clean.png" width="128" height="128" loading="lazy" alt="Picture of Aaron T. Grogg">
            <div>
                <h1 class="fn n" itemprop="name">
                    <span class="given-name">Aaron</span> <span class="middle-name"><abbr title="Thomas">T</abbr></span>. <span class="family-name">Grogg</span>
                </h1>
                <h2 itemprop="jobTitle">Web Developer</h2>
                <a class="url" itemprop="url" href="https://aarontgrogg.com/" target="_blank">aarontgrogg.com</a>
                <a class="email" itemprop="email" href="/cdn-cgi/l/email-protection#0a6b6b7865647e6d78656d6d4a6d676b636624696567"><span class="__cf_email__" data-cfemail="7e1f1f0c11100a190c1119193e19131f1712501d1113">[email&#160;protected]</span></a>
            </div>
        </header>

        <main role="main" id="main">

            <section class="labs">
<?php
    echo $output;
?>
            </section>

            <section class="additional">
                <div style="height:0;width:0;position:absolute;visibility:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg"><symbol id="email" viewBox="0 0 512 512"><title>Email icon</title><path d="M256 50C142.229 50 50 142.229 50 256s92.229 206 206 206 206-92.229 206-206S369.771 50 256 50zm123.956 114.444l-122.951 94.297-122.755-94.297h245.706zm-246.557 25.828l72.327 55.559-72.327 72.327V190.272zm.301 157.283l88.821-88.821 34.474 26.48 34.418-26.396 88.738 88.736H133.7zm246.9-29.248l-72.38-72.38 72.38-55.511v127.891z"></path></symbol><symbol id="facebook" viewBox="-3 -3 30 30"><title>Facebook icon</title><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path></symbol><symbol id="github" viewBox="0 0 512 512"><title>GitHub icon</title><path d="M256 55.083c-113.764 0-206 92.237-206 206 0 91.013 59.025 168.246 140.887 195.472 10.293 1.911 13.613-4.459 13.613-9.908v-38.356C147.199 420.764 135.262 384 135.262 384c-9.354-23.822-22.865-30.159-22.865-30.159-18.693-12.774 1.408-12.523 1.408-12.523 20.688 1.459 31.584 21.24 31.584 21.24 18.373 31.483 48.18 22.381 59.949 17.117 1.844-13.312 7.174-22.397 13.076-27.544-45.768-5.197-93.848-22.867-93.848-101.81 0-22.498 8.047-40.872 21.225-55.289-2.146-5.197-9.188-26.152 1.979-54.518 0 0 17.301-5.532 56.662 21.123 16.445-4.56 34.066-6.856 51.568-6.94 17.502.084 35.154 2.381 51.6 6.94 39.33-26.655 56.596-21.123 56.596-21.123 11.217 28.365 4.158 49.32 2.029 54.518 13.211 14.417 21.207 32.791 21.207 55.289 0 79.127-48.197 96.545-94.064 101.642 7.375 6.388 14.133 18.943 14.133 38.155v56.529c0 5.482 3.301 11.903 13.746 9.892C403.057 429.264 462 352.08 462 261.084c0-113.763-92.238-206.001-206-206.001z"></path></symbol><symbol id="linkedin" viewBox="0 0 512 512"><title>LinkedIn icon</title><path d="M256.417 50c-113.771 0-206 92.229-206 206s92.229 206 206 206 206-92.229 206-206-92.229-206-206-206zm-54.961 305.592h-45.229V209.469h45.229v146.123zm-22.83-165.259c-14.771 0-26.746-12.072-26.746-26.963s11.975-26.963 26.746-26.963c14.77 0 26.745 12.072 26.745 26.963s-11.975 26.963-26.745 26.963zm192.327 165.259h-45.01v-76.703c0-21.037-7.991-32.781-24.626-32.781-18.103 0-27.562 12.231-27.562 32.781v76.703h-43.38V209.469h43.38v19.679s13.047-24.137 44.032-24.137c30.986 0 53.165 18.918 53.165 58.058l.001 92.523z"></path></symbol><symbol id="rss" viewBox="0 0 512 512"><title>RSS icon</title><path d="M256 50C142.229 50 50 142.229 50 256s92.229 206 206 206 206-92.229 206-206S369.771 50 256 50zm-66.797 306.592c-16.381 0-29.66-13.278-29.66-29.66 0-16.381 13.279-29.658 29.66-29.658s29.659 13.277 29.659 29.658-13.278 29.66-29.659 29.66zm70.88 0c-.567-55.189-45.352-99.971-100.54-100.539v-43.939c79.544.568 143.91 64.934 144.479 144.479h-43.939zm74.43 0c-.133-46.756-18.396-90.693-51.474-123.771-33.011-33.012-76.843-51.267-123.496-51.47v-43.944c120.806.422 218.637 98.345 218.913 219.184h-43.943z"></path></symbol><symbol id="twitter" viewBox="0 0 512 512"><title>Twitter icon</title><path d="M256 50C142.229 50 50 142.229 50 256s92.229 206 206 206 206-92.229 206-206S369.771 50 256 50zm103.599 170.506c3.021 67.199-47.096 142.124-135.802 142.124-26.981 0-52.096-7.911-73.238-21.466 25.347 2.987 50.646-4.044 70.734-19.786-20.907-.386-38.554-14.198-44.632-33.181a47.859 47.859 0 0 0 21.575-.816c-22.976-4.617-38.839-25.317-38.321-47.453a47.567 47.567 0 0 0 21.642 5.977c-21.278-14.221-27.303-42.318-14.785-63.789 23.563 28.906 58.77 47.928 98.478 49.92-6.969-29.886 15.702-58.667 46.542-58.667 13.742 0 26.16 5.802 34.874 15.088a95.686 95.686 0 0 0 30.341-11.594c-3.567 11.157-11.144 20.521-21.008 26.433a95.413 95.413 0 0 0 27.441-7.523 97.038 97.038 0 0 1-23.841 24.733z"></path></symbol></svg>
                </div>
                <h1>Additional Links</label></h1>
                <ul class="social-links social-connect">
                    <li class="xfolkentry rss">
                        <a class="taggedlink" rel="me author" href="https://aarontgrogg.com/" title="Check-out my Blog" target="_blank">
                            <svg class="icon icon-rss"><use xlink:href="#rss"></use></svg>
                        </a>
                    </li>
                    <li class="xfolkentry twitter">
                        <a class="taggedlink" rel="me author" href="https://twitter.com/aarontgrogg" title="Follow me on Twitter" target="_blank">
                            <svg class="icon icon-twitter"><use xlink:href="#twitter"></use></svg>
                        </a>
                    </li>
                    <li class="xfolkentry linkedin">
                        <a class="taggedlink" rel="me author" href="https://www.linkedin.com/in/aarontgrogg" title="Find me on LinkedIn" target="_blank">
                            <svg class="icon icon-linkedin"><use xlink:href="#linkedin"></use></svg>
                        </a>
                    </li>
                    <li class="xfolkentry github">
                        <a class="taggedlink" rel="me author" href="https://github.com/aarontgrogg" title="Follow me on Github" target="_blank">
                            <svg class="icon icon-github"><use xlink:href="#github"></use></svg>
                        </a>
                    </li>
                </ul>
                <label for="additional" aria-hidden="true" title="Close this section">&#8682;</label>
            </section>
        </main>
        <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
    </body>
</html>