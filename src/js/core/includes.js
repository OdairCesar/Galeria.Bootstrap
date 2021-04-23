import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(cb) {
    if (!loadHtmlSuccessCallbacks.includes(cb)) {
        loadHtmlSuccessCallbacks.push(cb)
    }
}

function loadIncludes(parent) {
    if (!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(cb => cb(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()