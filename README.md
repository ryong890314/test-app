# test-app

## 개발환경

- Laravel8(php) + Jetstream(sanctum)
- MariaDB
- Apache Web Server
- React-native (Expo)

## CRUD

./routes/api.php

```php
Route::middleware('auth:sanctum')->post('category', [CategoryController::class, 'list']);
```

./app/Http/Controllers/CategoryController.php

```php
public function list(Request $request)
   {
        $userId = $request -> only('id');

        return Category::where('id', $userId)->get();
   }
```

DiaryMainScreen.js

```javascript
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.post('/api/category', {
        id: `${user.id}`,
    })
      .then(response => {
        setCategoryList(response.data);
        setCategoryCount(Object.values(response.data).length);
      })
      .catch(error => {
        console.log(error.response);
      })

    });

    return unsubscribe;

  }, [navigation]);
```