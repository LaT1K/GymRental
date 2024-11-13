<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingPlan extends Model
{
    use HasFactory;

    protected $table = 'booking_plan';

    protected $fillable = ['schedule_id', 'participant_id', 'planned_date'];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
