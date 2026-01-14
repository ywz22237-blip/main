<?php
// 보안 설정: 모든 곳에서 데이터 전송이 가능하게 허용
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// 1. 전송된 데이터 읽기
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // 2. 파일명 설정
    $filename = 'contacts.json';

    // 3. 기존 데이터 불러오기
    if (file_exists($filename)) {
        $json_content = file_get_contents($filename);
        $current_data = json_decode($json_content, true);
        if (!$current_data) $current_data = []; 
    } else {
        $current_data = [];
    }

    // 4. 새 데이터 추가
    $data['server_time'] = date("Y-m-d H:i:s");
    $current_data[] = $data;

    // 5. 파일 저장 (한글 깨짐 방지)
    $result = file_put_contents($filename, json_encode($current_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    if ($result !== false) {
        echo json_encode(["status" => "success", "message" => "서버에 저장이 완료되었습니다."]);
    } else {
        // 이 메시지가 나오면 폴더 권한을 수정해야 합니다.
        echo json_encode(["status" => "error", "message" => "서버 폴더에 쓰기 권한이 없습니다."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "전송된 데이터가 비어있습니다."]);
}
?>