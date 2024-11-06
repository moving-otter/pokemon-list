import {Header} from '@/components/atom';
import {DetailTemplateApi} from '@/components/template-api';

export default function DetailPage() {
  return (
    <div className="mx-auto flex flex-col h-screen ">
      <Header />

      <DetailTemplateApi />
    </div>
  );
}
