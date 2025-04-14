export const getUser = async (): Promise<{ name: string; isNew: boolean }> => {
   try {
      return await new Promise((resolve) =>
         setTimeout(() => {
            resolve({
               name: 'Elad Talmy',
               isNew: false,
            });
         }, 300)
      );
   } catch (err) {
      throw new Error('Failed to fetch user profile.');
   }
};
