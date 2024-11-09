import { useDiscoveryStore } from "@/store/discovery-store";
import { HighlightedText } from "@/components/atom";

interface TypeLabelProps {
  type: string;
}

export default function TypeLabel(props: TypeLabelProps) {
  const {type} = props;
  const singleSearch = useDiscoveryStore((state) => state.singleSearch);

  return (
    <div
      key={type}
      data-testid="type-label"
      className={`text-center min-w-[55px] max-w-[70px] break-words text-sm font-semibold px-1 py-1 rounded type-${type}`}
      style={{userSelect: 'none'}}
    >
      <HighlightedText 
        value={`${type?.charAt(0)?.toUpperCase() + type.slice(1)}`} 
        highlight={singleSearch} 
        textDecoration={true}
      />      
    </div>
  );
}
