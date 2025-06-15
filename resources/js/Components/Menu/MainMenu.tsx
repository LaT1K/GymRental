import MainMenuItem from '@/Components/Menu/MainMenuItem';
import {CircleGauge, UsersRoundIcon} from 'lucide-react';

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      <MainMenuItem
        text="Participants"
        link="participants.index"
        icon={<UsersRoundIcon size={20} />}
      />
    </div>
  );
}
