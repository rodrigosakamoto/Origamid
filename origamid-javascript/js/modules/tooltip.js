export default function initTooltip() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach((item) => {
        item.addEventListener('mouseover', onMouseOver);
    })

    function onMouseOver() {
        const tooltipBox = criarTooltipBox(this);
        onMouseMove.tooltipBox = tooltipBox;
        onMouseLeave.tooltipBox = tooltipBox;
        onMouseLeave.element = this;
        this.addEventListener('mouseleave', onMouseLeave);
        this.addEventListener('mousemove', onMouseMove);
    }

    const onMouseMove = {
        handleEvent(event) {
            this.tooltipBox.style.top = event.pageY + 20 + 'px';
            this.tooltipBox.style.left = event.pageX + 20 + 'px';
        }
    }

    const onMouseLeave = {
        tooltipBox: '',
        element: '',
        handleEvent() {
            this.tooltipBox.remove();
            this.element.removeEventListener('mouseleave', onMouseLeave);
        }
    }



    function criarTooltipBox(element) {
        const tooltipBox = document.createElement('div');
        const text = element.getAttribute('aria-label');
        tooltipBox.innerText = text;
        tooltipBox.classList.add('tooltip');
        document.body.appendChild(tooltipBox);
        return tooltipBox;
    }
}

