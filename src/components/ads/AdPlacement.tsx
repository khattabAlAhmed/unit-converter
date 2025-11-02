import AdSense from './AdSense';

interface AdPlacementProps {
  position: 'header' | 'sidebar' | 'content' | 'footer';
  adSlot: string;
}

export default function AdPlacement({ position, adSlot }: AdPlacementProps) {
  const getAdConfig = () => {
    switch (position) {
      case 'header':
        return {
          adFormat: 'horizontal' as const,
          style: { minHeight: '90px', margin: '1rem 0' },
          className: 'my-4',
        };
      case 'sidebar':
        return {
          adFormat: 'vertical' as const,
          style: { minHeight: '250px', width: '100%' },
          className: 'sticky top-20',
        };
      case 'content':
        return {
          adFormat: 'auto' as const,
          style: { minHeight: '100px', margin: '2rem 0' },
          className: 'my-8',
        };
      case 'footer':
        return {
          adFormat: 'horizontal' as const,
          style: { minHeight: '90px', margin: '1rem 0' },
          className: 'my-4',
        };
      default:
        return {
          adFormat: 'auto' as const,
          style: {},
          className: '',
        };
    }
  };

  const config = getAdConfig();

  return (
    <div className={`ad-placement ad-${position} ${config.className}`}>
      <AdSense
        adSlot={adSlot}
        adFormat={config.adFormat}
        style={config.style}
      />
    </div>
  );
}

