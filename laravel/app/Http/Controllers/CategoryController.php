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
        $userId = $request -> only('id');

        return Category::where('id', $userId)->get();
   }

   public function create(Request $request)
   {
     $category = new Category;

     $category -> id = $request -> id;
     $category -> name = $request -> name;
     $category -> start_date = $request -> start_date;
     $category -> end_date = $request -> end_date;
     $category -> end_page = $request -> end_page;
     $category -> open_scope = $request -> open_scope;

     $category->save();

     return response() -> json(['message' => 'create successful', 'code' => 200]);
   }

   public function detail(Request $request)
   {
    $categoryId = $request -> only('category_id');

    return Category::where('category_id', $categoryId)->first();
   }

   public function update(Request $request)
   {
    $categoryId = $request -> only('category_id');
    $categoryName = $request -> name;

     Category::where('category_id', $categoryId)->update(
       ['name' => $categoryName]
     );

     return $categoryName;
   }

   public function delete(Request $request)
   {
    $categoryId = $request -> only('category_id');

    Category::where('category_id', $categoryId)->delete();
   }

}
