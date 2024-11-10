<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alias extends Model
{
    use HasFactory;

    protected $fillable = ['alias_name'];

    public function participants()
    {
        return $this->belongsToMany(Participant::class, 'participant_aliases', 'alias_id', 'participant_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
