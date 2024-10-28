<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GamePeriod extends Model
{
    use HasFactory;

    protected $fillable = ['start_date', 'end_date', 'duration_weeks'];

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }

    public function votings()
    {
        return $this->hasMany(Voting::class);
    }
}
