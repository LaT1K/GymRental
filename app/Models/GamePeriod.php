<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property string $start_date
 * @property string $end_date
 * @property int $duration_weeks
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereDurationWeeks($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GamePeriod whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GamePeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'duration_weeks',
    ];
}
