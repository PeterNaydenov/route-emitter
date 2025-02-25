export default historyController;
declare function historyController(): {
    write: ({ state, title, url }: {
        state: any;
        title: any;
        url: any;
    }, keepHistoryFlag: any) => void;
    read: () => string;
    back: (steps?: number) => Promise<any>;
    go: (steps?: number) => Promise<any>;
    listen: (fn: any) => void;
    destroy: () => void;
};
//# sourceMappingURL=historyController.d.ts.map