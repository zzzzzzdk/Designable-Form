import React from 'react';

interface MassMarkerProps {
  __map__?: any;
  data?: Array<{
    id: string;
    lat: string | number;
    lng: string | number;
    text: string;
    [key: string]: any;
  }>;
  checkedIds?: string[];
  onChangeHoverData?: (event: any, data: any[]) => void;
  onChangeClickData?: (event: any, data: any[]) => void;
  zIndex?: number;
}

declare const MassMarker: React.FC<MassMarkerProps>;

export default MassMarker;