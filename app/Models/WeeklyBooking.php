<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklyBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'participant_id',
        'day_of_week',
        'start_time',
        'end_time',
        'booking_type',
        'fixed_price',
        'schedule_id'
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }

}
