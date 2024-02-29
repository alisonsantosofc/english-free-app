interface CustomIframeProps {
  src: string;
  title: string;
  width: string,
  height: string,
}

export function CustomIframe({ width, height, src, title }: CustomIframeProps) {
  return (
    <div>
      <iframe 
        width={width} 
        height={height}
        src={src} 
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      >
      </iframe>
    </div>
  )
}