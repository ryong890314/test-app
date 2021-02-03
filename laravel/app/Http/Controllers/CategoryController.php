<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
    * Show the profile for the given user.
    *
    * @param  int  $id
    * @return View
    */
   public function list(Request $request)
   {
        $categoryId = $request -> only('id');

        return Category::where('id', $categoryId)->get();
   }
}
