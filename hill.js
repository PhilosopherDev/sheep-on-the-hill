export class Hill {
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2)); // 스테이지 보다 살짝 크게 만들어서, 양이 자연스럽게 화면 밖에서부터 걸어오도록 함

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            }
        }
    }

    // 실제로 언덕을 그리는 함수
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = []; // 양의 좌표를 찾는데 사용하기 위한 변수

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy); // 곡선 그리기

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots;
    }

    // 언덕의 y 값을 랜덤으로 주기 위한 함수
    getY() {
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}