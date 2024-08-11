using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class m10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PriceUSD",
                table: "Cars",
                newName: "Price");

            migrationBuilder.AddColumn<int>(
                name: "Сurrency",
                table: "Cars",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Сurrency",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Cars",
                newName: "PriceUSD");
        }
    }
}
