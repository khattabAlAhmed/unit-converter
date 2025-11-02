import Script from 'next/script';

export default function AdSenseScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2044363478388359"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

