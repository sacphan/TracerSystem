using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using TracerCafe.Data;
using TracerCafe.Services.Product;
using Xunit;

namespace ProjectUnitTests
{
    public class DbFixture
    {
        public DbFixture()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection
           .AddDbContext<TracerCafeContext>(options => options.UseSqlServer("Server=localhost;Database=TracerCafe;Trusted_Connection=True;MultipleActiveResultSets=true"),
               ServiceLifetime.Transient);

            serviceCollection
                .AddScoped<IProductService, ProductService>();

            ServiceProvider = serviceCollection.BuildServiceProvider();
        }

        public ServiceProvider ServiceProvider { get; private set; }
    }
    public class ProductTest : IClassFixture<DbFixture>
    {
        private ServiceProvider _serviceProvider;
        public ProductTest(DbFixture fixture)
        {
            _serviceProvider = fixture.ServiceProvider;
        }

        [Fact]
        public async Task AddOrUpdateUserCart_PerfectData()
        {

            //arrange
            var productService = _serviceProvider.GetService<IProductService>();
            Guid productId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf292f");
            int quantity = 10;
            Guid userId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf2923");
            bool expected = true;
            //act
            var actual = await productService.AddOrUpdateUserCart(productId, quantity, userId);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task AddOrUpdateUserCart_ProductDontExist()
        {

            //arrange
            var productService = _serviceProvider.GetService<IProductService>();
            Guid productId = Guid.Empty;
            int quantity = 10;
            Guid userId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf2923");
            bool expected = false;
            //act
            var actual = await productService.AddOrUpdateUserCart(productId, quantity, userId);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task AddOrUpdateUserCart_QuantityGreaterThanProductQuantity()
        {

            //arrange
            var productService = _serviceProvider.GetService<IProductService>();
            Guid productId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf292e");
            int quantity = 1000;
            Guid userId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf2923");
            bool expected = false;
            //act
            var actual = await productService.AddOrUpdateUserCart(productId, quantity, userId);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task AddOrUpdateUserCart_QuantityCartGreaterThanProductQuantity()
        {

            //arrange
            var productService = _serviceProvider.GetService<IProductService>();
            Guid productId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf292e");
            int quantity = 91;
            Guid userId = Guid.Parse("323f5cd7-411e-4ef5-b1b8-bdd4aadf2923");
            bool expected = false;
            //act
            var actual = await productService.AddOrUpdateUserCart(productId, quantity, userId);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetListProduct_Staturday()
        {
            //arrange
            double expectedPriceProduct1 = 16000000;
            double expectedPriceProduct2 = 24000000;
            var productService = _serviceProvider.GetService<IProductService>();
            var expected = true;
            //act
            var result = false;
            var products = await productService.GetListProduct(DayOfWeek.Saturday);
            if (products[0].Price == expectedPriceProduct1 && products[1].Price == expectedPriceProduct2)
            {
                result = true;
            }
            //Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public async Task GetListProduct_NotStaturday()
        {
            //arrange
            double expectedPriceProduct1 = 20000000;
            double expectedPriceProduct2 = 30000000;
            var productService = _serviceProvider.GetService<IProductService>();
            var expected = true;
            //act
            var result = false;
            var products = await productService.GetListProduct(DayOfWeek.Monday);
            if (products[0].Price == expectedPriceProduct1 && products[1].Price == expectedPriceProduct2)
            {
                result = true;
            }
            //Assert
            Assert.Equal(expected, result);
        }
    }

}
