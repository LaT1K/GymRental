import MainMenuItem from '@/Components/Menu/MainMenuItem';
import {CalendarCheck2Icon, CircleGauge, UsersRoundIcon} from 'lucide-react';

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
      <MainMenuItem
        text="GamePeriods"
        link="game_periods.index"
        icon={<CalendarCheck2Icon size={20} />}
      />
    </div>
  );
}
