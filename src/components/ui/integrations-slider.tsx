import { InfiniteSlider } from './infinite-slider';
import { ProgressiveBlur } from './progressive-blur';
import {
  MessageSquare,
  Layout,
  Palette,
  HardDrive,
  FolderOpen,
  PenTool,
  FileText,
  Video,
  ShoppingBag,
  Package,
  Globe,
  Mail
} from 'lucide-react';

const logos = [
  {
    id: "logo-1",
    name: "Slack",
    icon: MessageSquare,
    color: "text-purple-400",
    description: "Comunicação",
  },
  {
    id: "logo-2",
    name: "Trello",
    icon: Layout,
    color: "text-blue-400",
    description: "Gestão",
  },
  {
    id: "logo-3",
    name: "Figma",
    icon: Palette,
    color: "text-pink-400",
    description: "Design",
  },
  {
    id: "logo-4",
    name: "Dropbox",
    icon: HardDrive,
    color: "text-blue-500",
    description: "Armazenamento",
  },
  {
    id: "logo-5",
    name: "Google Drive",
    icon: FolderOpen,
    color: "text-yellow-400",
    description: "Armazenamento",
  },
  {
    id: "logo-6",
    name: "Canva",
    icon: PenTool,
    color: "text-cyan-400",
    description: "Design",
  },
  {
    id: "logo-7",
    name: "Notion",
    icon: FileText,
    color: "text-zinc-300",
    description: "Documentação",
  },
  {
    id: "logo-8",
    name: "Zoom",
    icon: Video,
    color: "text-blue-400",
    description: "Vídeo",
  },
  {
    id: "logo-9",
    name: "Shopify",
    icon: ShoppingBag,
    color: "text-green-400",
    description: "E-commerce",
  },
  {
    id: "logo-10",
    name: "Vtex",
    icon: Package,
    color: "text-orange-400",
    description: "E-commerce",
  },
  {
    id: "logo-11",
    name: "WordPress",
    icon: Globe,
    color: "text-blue-300",
    description: "CMS",
  },
  {
    id: "logo-12",
    name: "Mailchimp",
    icon: Mail,
    color: "text-yellow-500",
    description: "Email",
  },
];

export function IntegrationsSlider() {
  return (
    <div className='relative w-full overflow-hidden bg-dark-800 py-8'>
      <InfiniteSlider
        className='flex h-full w-full items-center'
        duration={40}
        gap={64}
      >
        {logos.map((logo) => {
          const Icon = logo.icon;
          return (
            <div
              key={logo.id}
              className='flex w-48 flex-col items-center justify-center gap-3'
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all hover:scale-110 hover:bg-white/10`}>
                <Icon className={logo.color} size={32} />
              </div>
              <span className="text-sm font-medium text-zinc-400">{logo.name}</span>
            </div>
          );
        })}
      </InfiniteSlider>

      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
        direction='left'
        blurIntensity={2}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[200px]'
        direction='right'
        blurIntensity={2}
      />
    </div>
  );
}
