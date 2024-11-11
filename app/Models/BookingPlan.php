<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingPlan extends Model
{
    use HasFactory;

    protected $table = 'booking_plan';

    protected $fillable = ['schedule_id', 'participant_id', 'planned_date'];

    // Зв'язок з моделлю Schedule
    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    // Зв'язок з моделлю Participant
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
