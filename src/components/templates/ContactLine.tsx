import React from 'react';
import type { PersonalInfo } from '../../types';

interface IconProps {
  size?: number;
  color?: string;
}

const icStyle = (size: number): React.CSSProperties => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  flexShrink: 0,
  width: size,
  height: size,
});

export const MapPinIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={icStyle(size)}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={icStyle(size)}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={icStyle(size)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24l3.03.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.09 6.09l1.08-1.08a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={icStyle(size)}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} style={icStyle(size)}>
    <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73A1.77 1.77 0 1 1 6.5 3.2a1.77 1.77 0 0 1 0 3.53zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77C14.4 7.19 20 7 20 13.24V19z" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={icStyle(size)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);

interface ContactLineProps {
  personal: PersonalInfo;
  iconColor?: string;
  textColor?: string;
  fontSize?: string;
  iconSize?: number;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center';
}

interface ItemDef {
  key: string;
  icon: React.ReactNode;
  text: string;
}

export const ContactLine: React.FC<ContactLineProps> = ({
  personal: p,
  iconColor = '#666',
  textColor = '#555',
  fontSize = '8.5pt',
  iconSize = 9,
  direction = 'row',
  justify = 'flex-start',
}) => {
  const items: ItemDef[] = [];

  if (p.city || p.country) {
    items.push({
      key: 'loc',
      icon: <MapPinIcon size={iconSize} color={iconColor} />,
      text: [p.city, p.country].filter(Boolean).join(', '),
    });
  }
  if (p.email) {
    items.push({ key: 'email', icon: <MailIcon size={iconSize} color={iconColor} />, text: p.email });
  }
  if (p.phone) {
    items.push({ key: 'phone', icon: <PhoneIcon size={iconSize} color={iconColor} />, text: p.phone });
  }
  if (p.github) {
    items.push({ key: 'gh', icon: <GithubIcon size={iconSize} color={iconColor} />, text: p.github });
  }
  if (p.linkedin) {
    items.push({ key: 'li', icon: <LinkedInIcon size={iconSize} color={iconColor} />, text: p.linkedin });
  }
  if (p.portfolio) {
    items.push({ key: 'pf', icon: <GlobeIcon size={iconSize} color={iconColor} />, text: p.portfolio });
  }

  if (items.length === 0) return null;

  if (direction === 'column') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5pt' }}>
        {items.map(({ key, icon, text }) => (
          <span key={key}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5pt', fontSize, color: textColor }}>
            {icon}
            <span style={{ wordBreak: 'break-all' }}>{text}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: justify,
      gap: '4pt 14pt',
      marginTop: '4pt',
    }}>
      {items.map(({ key, icon, text }) => (
        <span key={key}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4pt', fontSize, color: textColor }}>
          {icon}
          <span>{text}</span>
        </span>
      ))}
    </div>
  );
};
