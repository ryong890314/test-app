<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;

class DiaryController extends Controller
{
    public function list(Request $request)
   {
        $categoryId = $request -> only('category_id');

        return Diary::select('diary_id', 'category_id', 'title', 'diary_date', 'weather', 'emotion_no', 'image', 'open_scope')->where('category_id', $categoryId)->get();
   }

   public function create(Request $request)
   {
     $diary = new Diary;

     $diary -> category_id = $request -> category_id;
     $diary -> title = $request -> title;
     $diary -> diary_date = $request -> diary_date;
     $diary -> create_date = $request -> create_date;
     $diary -> weather = $request -> weather;
     $diary -> emotion_no = $request -> emotion_no;
     $diary -> content = $request -> content;
     $diary -> image = $request -> image;
     $diary -> open_scope = $request -> open_scope;

     $diary->save();

     return response() -> json(['message' => 'create successful', 'code' => 200]);
   }

   public function detail(Request $request)
   {
    $diaryId = $request -> only('diary_id');

    return Diary::where('diary_id', $diaryId)->first();
   }

   public function update(Request $request)
   {
    $diaryId = $request -> only('diary_id');
    $title = $request -> title;
    $content = $request -> content;

     Diary::where('diary_id', $diaryId)->update(
       ['title' => $title, 'content' => $content]
     );

     return $title;
   }

   public function delete(Request $request)
   {
    $diaryId = $request -> only('diary_id');

    Diary::where('diary_id', $diaryId)->delete();
   }

}
