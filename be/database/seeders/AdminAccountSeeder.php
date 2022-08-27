<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserInfo;

class AdminAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newInfo = UserInfo::create([
            'first_name'   => 'Ezikiel',
            'middle_name'  => 'Pura',
            'last_name'    => 'Tulawan',
            'phone_number' => '09926838860',
            'address'      => 'B-002 L-003 Lessandra, Brgy. Arado, Palo, Leyte 6501'
        ]);

        $newAcc = User::create([
            'username'     => 'admin',
            'password'     => 'admin',
            'role_id'      => 1,
            'user_info_id' => $newInfo->id
        ]);
    }
}
