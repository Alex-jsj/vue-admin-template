export default {
    name: 'TableExpand',
    functional: true,
    props: {
        row: Object, // scope row
        render: Function,
        index: Number, // index
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
    }
};
