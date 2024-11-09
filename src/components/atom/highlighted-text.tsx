import {escapeRegExp} from 'lodash';

interface HighlightedTextProps {
  value: string;
  highlight: string;
  textDecoration?: boolean;
}

export default function HighlightedText(props: HighlightedTextProps) {
  const {value, highlight, textDecoration = false} = props;

  if (!highlight.trim()) {
    return <span>{value}</span>;
  }

  const getStyleObject = () => {
    if (textDecoration) {
      return {
        fontWeight: 900,
        textDecoration: 'underline',
        textDecorationThickness: '0.20em', // 텍스트 크기에 비례하는 underline 두께
      };
    } else {
      return {
        backgroundColor: '#9fe0fe',
      };
    }
  };

  const getTextWithHighlights = () => {
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = value.split(regex);

    return (
      <span>
        {parts
          .filter((part) => part)
          .map((part, i) =>
            regex.test(part) ? (
              <span style={getStyleObject()}>{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
      </span>
    );
  };

  return <>{getTextWithHighlights()}</>;
}
