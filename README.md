# Black End — GitHub Pages

이 저장소는 GitHub Pages용입니다. `main` 브랜치에 올린 뒤 GitHub 저장소의 **Settings → Pages → Build and deployment → GitHub Actions**를 한 번 선택하면 자동 배포됩니다. 이후 저장소의 **Actions** 탭에서 배포 완료 후 표시되는 주소를 여세요.

## 포함해야 하는 파일

- `index.html`
- `outputs/nvidia-gemma-chat.html`
- `outputs/app.webmanifest`
- `outputs/service-worker.js`
- `outputs/icon.svg`

## API 연결 관련 중요 사항

이 프로젝트는 사용자의 NVIDIA API 키를 브라우저에만 저장하는 BYOK 방식입니다. 그러나 GitHub Pages는 정적 호스팅이라 API 요청을 중계할 서버가 없습니다. NVIDIA API가 GitHub Pages 출처의 브라우저 요청(CORS)을 허용하지 않으면 앱 코드는 올바르더라도 브라우저에 `Failed to fetch`가 표시됩니다.

이 경우 GitHub Pages만으로는 해결할 수 없습니다. GitHub Pages는 정적 파일만 제공하며 외부 API를 중계할 서버 기능이 없습니다.

즉, **GitHub Pages는 화면 배포용**, **Worker/Function은 NVIDIA API 연결용**입니다. 두 가지를 함께 써야 실제 채팅이 작동합니다.

## Cloudflare Worker 연결 (필수)

1. Cloudflare Dashboard에서 **Workers & Pages → Create → Worker**를 선택합니다.
2. 새 Worker의 코드를 이 저장소의 `cloudflare-worker.js` 내용으로 교체하고 Deploy합니다.
3. 생성된 `https://...workers.dev` 주소를 복사합니다.
4. Black Eye의 **AI 설정 → API 연결 주소**에 그 주소를 넣고, 본인의 NVIDIA API 키도 입력합니다.

이 Worker는 키를 저장하지 않고, 브라우저가 전송한 본인 키로 NVIDIA 요청을 중계합니다. GitHub 저장소에는 키가 들어가지 않습니다.
