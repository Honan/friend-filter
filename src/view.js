const View = {
    render(templateName, model) { // имя шаблона, данные

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSource);
        
        return renderFn(model);
    }
};

export default View;