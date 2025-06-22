<?php

namespace App\Telegram\Commands;

use App\Models\User;
use Telegram\Bot\Commands\Command;

final class HelpCommand extends Command
{
    /**
     * @var string Command Name
     */
    protected string $name = 'help';

    /**
     * @var array Command Aliases
     */
    protected array $aliases = ['listcommands'];

    /**
     * @var string Command Description
     */

    private const NOT_AUTH_ACTIONS = [
        'login',
        'help',
    ];

    private const AUTH_ACTIONS = [
        'current_votes',
        'status',
        'bookings',
        'transactions',
    ];

    public function __construct()
    {
        $this->setDescription(__('telegram.help_list_available_actions'));
    }

    /**
     * {@inheritdoc}
     */
    public function handle(): void
    {
        $user_id = $this->getTelegram()->getWebhookUpdate()->getMessage()->from->user_id;
        $user_name = $this->getTelegram()->getWebhookUpdate()->getMessage()->from->username;

        \Log::info(json_encode($this->telegram->getCommandBus()->getCommands()));

        $text = __('telegram.available_commands') . PHP_EOL;

        $commands = $this->telegram->getCommandBus()->getCommands();

        if ($this->isCurrentlyLoggedIn($user_id, $user_name)) {
            $targetNames = self::AUTH_ACTIONS;
        } else {
            $targetNames = self::NOT_AUTH_ACTIONS;
        }

        foreach ($targetNames as $targetName) {
            if (($handler = $commands[$targetName]) instanceof Command) {
                $text .= sprintf('/%s - %s' . PHP_EOL, $handler->getName(), $handler->getDescription());
            }
        }

        $this->replyWithMessage(['text' => $text]);
    }

    private function isCurrentlyLoggedIn(
        int|null $telegramUserId,
        string|null $telegramUserName,
    ): bool {
        return true;
    }

    private function lastRequestedAction(User $user): string
    {
        return false;
    }
}
