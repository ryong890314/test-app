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

   public function create(Request $request)
   {
     $category = new Category;

     $category -> id = $request -> id;
     $category -> name = $request -> name;
     $category -> open_scope = $request -> open_scope;
     $category -> start_date = $request -> start_date;
     $category -> end_date = $request -> end_date;

     $category->save();

     return response() -> json(['message' => 'create successful', 'code' => 200]);
   }
}
