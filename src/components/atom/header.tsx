interface HeaderProps {
  hasBorder?: boolean; // border 스타일을 적용할지 여부를 결정하는 prop
}

export default function Header(props: HeaderProps) {
  const {hasBorder = true} = props;

  const handleTitleClick = () => (window.location.href = '/');

  return (
    <div
      data-testid="header"
      className={`bg-gray-50 py-3 px-5 flex items-center select-none  ${
        hasBorder ? 'border-b-2 border-gray-200' : ''
      }`}
    >
      <img
        src="/favicon/monsterball-312x320.png"
        alt="Pokedex Icon"
        className="w-7 h-7 ml-1 mr-3"
      />
      <div
        className="text-2xl font-bold cursor-pointer"
        style={{width: 'fit-content'}}
        onClick={handleTitleClick}
      >
        Pokedex
      </div>
    </div>
  );
}
