interface TypeLabelProps {
  type: any;
}

export default function TypeLabel(props: TypeLabelProps) {
  const {type} = props;

  return (
    <div
      data-testid="type-label"
      key={type}
      className={`text-center min-w-[55px] max-w-[70px] break-words text-sm font-semibold px-1 py-1 rounded type-${type}`}
    >
      {type?.charAt(0)?.toUpperCase() + type.slice(1)}
    </div>
  );
}
