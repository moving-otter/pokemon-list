export default function LoadingSlider() {
  return (
    <div data-testid="loading-slider" className="w-full h-0.5 bg-gray-200 overflow-hidden fixed">
      <div className="absolute left-0 bottom-0 h-full w-full bg-blue-400 animate-slide-reset" />
    </div>
  );
}
