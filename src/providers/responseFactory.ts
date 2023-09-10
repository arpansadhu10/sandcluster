class ResponseFactory{
    public static responseFactory = <T>(data: T, message: string) => ({
        data,
        message,
      });
}

export default ResponseFactory;