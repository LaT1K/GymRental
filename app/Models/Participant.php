<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'telegram_username', 'joined_date'];

    public function aliases()
    {
        return $this->belongsToMany(Alias::class, 'participant_aliases', 'participant_id', 'alias_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
