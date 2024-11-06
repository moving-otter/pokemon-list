import {escapeRegExp} from 'lodash';

interface HighlightedTextProps {
  value: string;
  highlight: string;
}

export default function HighlightedText(props: HighlightedTextProps) {
  const {value, highlight} = props;

  if (!highlight.trim()) {
    return <span>{value}</span>;
  }

  const getTextWithHighlights = () => {
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = value.split(regex);

    return (
      <span>
        {parts
          .filter((part) => part)
          .map((part, i) =>
            regex.test(part) ? (
              <span style={{backgroundColor: '#9fe0fe'}}>{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
      </span>
    );
  };

  return <>{getTextWithHighlights()}</>;
}
